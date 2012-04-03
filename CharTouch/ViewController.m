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

@end

