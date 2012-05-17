# -*- encoding: utf-8 -*-
require 'kconv'

$h = Hash.new

def load_bushu()
    f = open("bushu.txt", "r")
    f.each_line { |line|
        if (line =~ /(\S+),(\S+)/) then
            rect = $1
            kjs = $2
            kjs.each_char{ |c|
                $h[c] = "_" + rect
            }
        end
    }
end

$k2g = Hash.new
$all = Hash.new
$colors = {1=>"red", 2=>"blue", 3=>"orange", 4=>"pink", 5=>"green", 6=>"gray"}

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
	if (line =~ /(\S*)１(\S*)２(\S*)３(\S*)。(\S*)/) then
		pre = $1
		apre = $4
		yomi = $5
		kj = $3.slice(0)
		kj2 = $3.slice(1..9)
		kj0 = $2
		kjx = $h[kj]
		s = sprintf("%s◯%s<rt>%s</rt>", kj0, kj2, yomi);	
		s2 = sprintf("<ruby>%s</ruby>", s);
		s3 = sprintf("<nobr>%s%s%s。</nobr>", pre, s2, apre);
		s4 = s3.gsub("、", "、<wbr> </wbr>");
		s5 = s4.gsub("　", "<wbr> </wbr>");

		printf "all_quiz['%dk%d'] = '%s%s,%s';\n", grade, i, kj, kjx, s5
		s6 = ""
		s5.each_char{ |c|
		  g = $k2g[c]
		  if ( !g.nil? ) then
		    s6 += "<font color=\""
		    s6 += $colors[g.to_i]
		    s6 += "\">"
		    s6 += c
		    s6 += "</font>"
		  else
		    s6 += c
		  end
		}
		printf $html, "%d,%d %s　%s<br>\n", grade, i, s6,kj
		i = i+1
	end
     }
end
 
load_bushu()
load_kanji_list()
$html = open("k16.html", "w")
printf $html, "<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"UTF-8\">\n"
printf $html, "</head>\n<body>赤：１年、青：２年、黄：３年、桃：４年、緑：５年、灰：６年<br>\n"
one_file("k1.txt",1)
one_file("k2.txt",2)
one_file("k3.txt",3)
one_file("k4.txt",4)
one_file("k5.txt",5)
one_file("k6.txt",6)
printf $html, "</body>\n</html>\n"
