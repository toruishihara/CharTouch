# -*- encoding: utf-8 -*-

hira="あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"

i = 0;
hira.each_char { |c|
	d = c.tr("あ-ん", "ア-ン")
	printf("all_quiz[\'1n%s\'] = \'%s,%s';\n", i, d,c)
	i = i+1;
}