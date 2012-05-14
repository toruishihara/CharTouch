# -*- encoding: utf-8 -*-
require 'kconv'

# read k3.txt and check all k3 kanji is listed.
# If not, show as missing=
#

$k2g = Hash.new
$all = Hash.new

def load_kanji_list()
    f = open("kanji_list.txt", "r")
    i = 1;
    f.each_line { |line|
        if ( line =~ /(\d+),(\S+)/) then
            g = $1.to_i
            $2.each_char{ |c|
                $all[c] = 0
                $k2g[c] = g
            }
        end
    }
end

def one_file(fname,grade)
    f2 = open(fname, "r")
    i = 0
    f2.each_line { |line|
        if (line =~ /２(\S*)/) then
            c = $1.slice(0,1)
            $all[c] = 1
            printf "%s%d ", c, $k2g[c] # display found
        end
    }
    printf "\n"
    missing = ""
    $k2g.each { |c,g|
        if (g == grade) then
            if ($all[c] == 0) then
                missing += c
            end
        end
    }
    printf "missing=%s\n",missing
end

 
load_kanji_list()
one_file("k1.txt",1)
one_file("k2.txt",2)
one_file("k3.txt",3)
one_file("k4.txt",4)
one_file("k5.txt",5)
one_file("k6.txt",6)
