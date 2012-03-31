# -*- encoding: utf-8 -*-

cnt = 0;
while cnt < 20 do
	a = (rand(9) + 1)
	b = (rand(9) + 1)
	c = a + b
	if (c <= 10) then
		printf("all_quiz[\'1m%d\'] = \'%d,%d+%d=';\n", cnt, c, a, b)
		cnt = cnt + 1
	end
end
cnt = 0;
while cnt < 20 do
	a = (rand(9) + 1)
	b = (rand(9) + 1)
	c = a - b
	if (c <= 10 && c >= 0) then
		printf("all_quiz[\'2m%d\'] = \'%d,%d-%d=';\n", cnt, c, a, b)
		cnt = cnt + 1
	end
end

cnt = 0;
while cnt < 30 do
	a = (rand(49) + 1)
	b = (rand(29) + 1)
	c = a + b
	if (c > 0) then
		printf("all_quiz[\'3m%d\'] = \'%d,%d+%d=';\n", cnt, c, a, b)
		cnt = cnt + 1
	end
end

cnt = 0;
while cnt < 30 do
	a = (rand(49) + 1)
	b = (rand(29) + 1)
	c = a - b
	if (c >= 0) then
		printf("all_quiz[\'4m%d\'] = \'%d,%d-%d=';\n", cnt, c, a, b)
		cnt = cnt + 1
	end
end

cnt = 0;
while cnt < 30 do
	a = (rand(9) + 1)
	b = (rand(9) + 1)
	c = a * b
	if (c >= 0) then
		printf("all_quiz[\'5m%d\'] = \'%d,%d×%d=';\n", cnt, c, a, b)
		cnt = cnt + 1
	end
end

cnt = 0;
while cnt < 30 do
	a = (rand(49) + 1)
	b = (rand(9) + 1)
	c = a / b
	d = a % b
	if (d == 0) then
		printf("all_quiz[\'6m%d\'] = \'%d,%d÷%d=';\n", cnt, c, a, b)
		cnt = cnt + 1
	end
end

