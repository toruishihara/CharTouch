# -*- encoding: utf-8 -*-
require 'kconv'

f2 = open("k3.txt", "r")
grade = 3
i = 0
f2.each_line { |line|
	if (line =~ /(\S*)１(\S*)２(\S*)３(\S*)。(\S*)/) then
		pre = $1
		apre = $4
		yomi = $5
		kj = $3.slice(0)
		kj2 = $3.slice(1..9)
		kj0 = $2
		s = sprintf("%s◯%s<rt>%s</rt>", kj0, kj2, yomi);	
		s2 = sprintf("<ruby>%s</ruby>", s);
		s3 = sprintf("<nobr>%s%s%s。</nobr>", pre, s2, apre);
		s4 = s3.gsub("、", "、<wbr> </wbr>");
		s5 = s4.gsub("　", "<wbr> </wbr>");

		printf "all_quiz['%dk%d'] = '%s,%s';\n", grade, i, kj, s5
		i = i+1
	end
 }
 
