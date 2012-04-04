//
//  ViewController.h
//  CharTouch
//
//  Created by 1 torui on 12/01/17.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController <UIWebViewDelegate>{
    IBOutlet UIWebView *webView;
}
@property (nonatomic, retain) UIWebView *webView;

@end
