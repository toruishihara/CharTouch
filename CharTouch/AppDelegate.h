//
//  AppDelegate.h
//  CharTouch
//
//  Created by 1 torui on 12/01/17.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ViewController.h"

#ifdef PURCHASE_CHECK
#import "PurchaseCheck.h"
#endif

@class ViewController;

@interface AppDelegate : UIResponder <UIApplicationDelegate> {
#ifdef PURCHASE_CHECK
    PurchaseCheck *purchase;
#endif
}

@property (strong, nonatomic) UIWindow *window;
@property (strong, nonatomic) ViewController *viewController;

@end
