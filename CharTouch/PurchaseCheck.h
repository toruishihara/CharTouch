//
//  PurchaseCheck.h
//  CharTouch
//
//  Created by 1 torui on 12/01/17.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//

#import <StoreKit/StoreKit.h>

@interface PurchaseCheck : NSObject <SKProductsRequestDelegate, SKPaymentTransactionObserver> {
}
- (void)requestProductData;
- (void)productsRequest:(SKProductsRequest *)request
     didReceiveResponse:(SKProductsResponse *)response;
- (void)completeUpgradePlus;

@end
