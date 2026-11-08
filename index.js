/**
 * نظام إدارة وتحليل نتائج الطلاب (Student Results Management and Analysis System)
 * تكليف عملي: تطبيق OOP + Array Methods (map, filter, reduce)
 */

// 1. كلاس Student
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  // دالة حساب المتوسط باستخدام reduce
  getAverage() {
    const sum = this.grades.reduce((total, grade) => total + grade, 0);
    return sum / this.grades.length;
  }

  // دالة التقدير بالحروف باستخدام if/else
  getGrade(avg = this.getAverage()) {
    if (avg >= 85) {
      return "A";
    } else if (avg >= 75) {
      return "B";
    } else if (avg >= 65) {
      return "C";
    } else if (avg >= 50) {
      return "D";
    } else if (avg >= 40) {
      return "E";
    } else {
      return "F";
    }
  }

  // دالة النتيجة النهائية باستخدام المعامل &&
  getFinalResult() {
    if (this.getAverage() >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

// 2. مصفوفة الطلاب الافتراضية
let studentsList = [
  new Student(1, "أحمد علي", [85, 90, 80], 85),
  new Student(2, "سارة حسن", [45, 42, 48], 80),   // متعثرة: متوسط 45
  new Student(3, "محمود عمر", [46, 47, 42], 75),  // متعثر: متوسط 45
  new Student(4, "ريم خالد", [70, 75, 65], 90)
];

/**
 * دالة تشغيل محرك التحليل الأكاديمي ولجنة الرأفة
 * تقوم بتنفيذ دوال filter, map, reduce وطباعة النتائج للكونسول
 */
function processAcademicEngine(list = studentsList) {
  // 1. استخراج الطلاب المتعثرين (متوسط بين 40 و 49) باستخدام filter
  const strugglingStudents = list.filter((student) => {
    const avg = student.getAverage();
    return avg >= 40 && avg <= 49;
  });

  // 2. إضافة 5 درجات رأفة لمتوسط الطلاب المتعثرين باستخدام map
  const adjustedStudents = strugglingStudents.map((student) => {
    const newAverage = Number((student.getAverage() + 5).toFixed(2));
    return {
      id: student.id,
      name: student.name,
      attendance: student.attendance,
      newAverage: newAverage,
      grade: student.getGrade(newAverage),
      result: (newAverage >= 50 && student.attendance >= 75) ? "ناجح (برأفة)" : "يحتاج مراجعة"
    };
  });

  // 3. جمع المتوسطات الجديدة باستخدام reduce
  const totalAdjustedAverages = adjustedStudents.reduce((total, student) => {
    return total + student.newAverage;
  }, 0);

  // 4. حساب متوسط درجات المتعثرين بعد التعديل مع درع حماية لمنع القسمة على صفر
  const clemencyAverage = adjustedStudents.length > 0 
    ? Number((totalAdjustedAverages / adjustedStudents.length).toFixed(2)) 
    : 0;

  // 5. المخرجات (Console Logging)
  console.log("===============================================================");
  console.log("🎓 تقرير درجات الطلاب (التقرير العام)");
  console.log("===============================================================");
  list.forEach((student) => {
    const avg = student.getAverage();
    const grade = student.getGrade(avg);
    const result = student.getFinalResult();
    console.log(`📌 الاسم: ${student.name} | رقم الجلوس: ${student.id} | المتوسط: ${avg.toFixed(2)}% | التقدير: [${grade}] | النتيجة: [${result}]`);
  });

  console.log("\n===============================================================");
  console.log("⚖️ مصفوفة الطلاب المتعثرين بعد إضافة الرأفة (+5 درجات)");
  console.log("===============================================================");
  console.log(adjustedStudents);

  console.log("\n===============================================================");
  console.log(`📊 متوسط درجات الطلاب المتعثرين بعد التعديل: ${clemencyAverage}%`);
  console.log("===============================================================\n");

  return {
    strugglingStudents,
    adjustedStudents,
    totalAdjustedAverages,
    clemencyAverage
  };
}

// تشغيل أولي افتراضي
if (typeof window === 'undefined') {
  // عند التشغيل من خلال Node.js
  processAcademicEngine(studentsList);
}
