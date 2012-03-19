//
//  PurchaseCheck.m
//  CharTouch
//
//  Created by 1 torui on 12/01/17.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//

#import "PurchaseCheck.h"

@implementation PurchaseCheck

- (id)init {
    self = [super init];
    if ([SKPaymentQueue canMakePayments])
    {
        NSLog(@"canMakePayments");
        [self requestProductData];
    } else {
        NSLog(@"cannotMakePayments");
    }
    return self;
}

- (void) requestProductData
{
    SKProductsRequest* request= [[SKProductsRequest alloc]
                                 initWithProductIdentifiers: [NSSet setWithObject: @"all_grades"]];
    request.delegate = self;
    [request start];
}
- (void)productsRequest:(SKProductsRequest *)request
     didReceiveResponse:(SKProductsResponse *)response
{
    //[request autorelease];
    if (response == nil) {
        NSLog(@"Product Response is nil");
        return;
    }
        
    // 確認できなかったidentifierをログに記録
    for (NSString *identifier in response.invalidProductIdentifiers) {
        NSLog(@"invalid product identifier: %@", identifier);
    }
        
    for (SKProduct *product in response.products ) {
        NSLog(@"valid product identifier: %@", product.productIdentifier);
        SKPayment *payment = [SKPayment paymentWithProduct:product];
        [[SKPaymentQueue defaultQueue] addPayment:payment];
    }
}
- (void)paymentQueue:(SKPaymentQueue *)queue updatedTransactions:(NSArray *)transactions {
    BOOL purchasing = YES;
    for (SKPaymentTransaction *transaction in transactions) {
        switch (transaction.transactionState) {
                // 購入中
            case SKPaymentTransactionStatePurchasing: {
                NSLog(@"Payment Transaction Purchasing");
                break;
            }
                // 購入成功
            case SKPaymentTransactionStatePurchased: {
                NSLog(@"Payment Transaction END Purchased: %@", transaction.transactionIdentifier);
                purchasing = NO;
                [self completeUpgradePlus];
                [queue finishTransaction:transaction];
                break;
            }
                // 購入失敗
            case SKPaymentTransactionStateFailed: {
                NSLog(@"Payment Transaction END Failed: %@ %@", transaction.transactionIdentifier, transaction.error);
                purchasing = NO;
                // ... アラートを表示 ...
                [queue finishTransaction:transaction];
                break;
            }
                // 購入履歴復元
            case SKPaymentTransactionStateRestored: {
                NSLog(@"Payment Transaction END Restored: %@", transaction.transactionIdentifier);
                // 本来ここに到達しない
                purchasing = NO;
                [queue finishTransaction:transaction];
                break;
            }
        }
    }
    
    if (purchasing == NO) {
        //[(UIView *)[self.view.window viewWithTag:21] removeFromSuperview];
        [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
    }
}
// 課金が行われた後、呼び出す
- (void)completeUpgradePlus {
    // アップグレード済みとする
    NSLog(@"completeUpgradePlus");
    //[[ZConfig instance] setPlus:YES];
    //[self.tableView reloadData];
}
// purchase check

@end
