# -*- encoding: utf-8 -*-

hira="あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"

hira.each_char { |c|
	d = c.tr("あ-ん", "ア-ン")
	printf("answer_quiz[\'%s\'] = \'%s\';\n", d, c)
}

i = 0;
hira.each_char { |c|
	d = c.tr("あ-ん", "ア-ン")
	printf("num_answer[\'%s\'] = \'%s';\n", i, d)
	i = i+1;
}