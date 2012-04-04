//
//  ViewController.m
//  CharTouch
//
//  Created by 1 torui on 12/01/17.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//

#import "ViewController.h"

@implementation ViewController

@synthesize webView;

- (void)viewDidLoad
{
    [super viewDidLoad];

	NSString *path = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html"];
    [webView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
    [webView setDelegate:self];
}

- (void)viewWillAppear:(BOOL)animated
{
}

- (void)viewDidAppear:(BOOL)animated
{
    webView.opaque = YES;
}

- (void)dealloc
{	
    //[webView release];
	//[super dealloc];
}

#ifdef DEBUG
- (BOOL)webView:(UIWebView *)webView2 
shouldStartLoadWithRequest:(NSURLRequest *)request 
 navigationType:(UIWebViewNavigationType)navigationType {
    NSString *requestString = [[[request URL] absoluteString] stringByReplacingPercentEscapesUsingEncoding: NSUTF8StringEncoding];
    if ([requestString hasPrefix:@"ios-log:"]) {
        NSString* logString = [[requestString componentsSeparatedByString:@":#iOS#"] objectAtIndex:1];
        NSLog(@"UIWebView console: %@", logString);
        return NO;
    }
    return YES;
}
#endif
@end

