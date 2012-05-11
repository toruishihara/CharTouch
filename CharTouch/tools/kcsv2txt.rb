# -*- encoding: utf-8 -*-
require 'kconv'

f2 = open("k1.csv", "r")
i = 0
f2.each_line { |line|
    if (line =~ /(\S+),(\S*)（(\S+)）(\S*)/) then
        printf "%s１２%s３%s。%s\n",$2,$1,$4,$3
    i = i+1
    end
}
