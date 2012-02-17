# -*- encoding: utf-8 -*-
require 'kconv'
$url = "http://go-kanken.com/mondai5/yomi%02d.html"
#$url = "%d.html"

f = open("kanji_list.txt")
grade = 0
f.each_line { | s |
  grade = grade + 1
  s.each_char { | c |
    if (c[0] > " " && grade == ARGV[0].to_i) then
      printf "%s,\n", c
    end
  }
}

