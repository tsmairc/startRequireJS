require(["js/student", "js/class", "js/jquery"], function(student, clz) { 
	clz.addToClass(student.createStudent("Jack", "male")); 
	clz.addToClass(student.createStudent("Rose", "female")); 
	console.log(clz.getClassSize());  // 输出 2 
	console.log('test -- success');
	console.log($("#test").text() + "-----------------jquery加载成功");
 });