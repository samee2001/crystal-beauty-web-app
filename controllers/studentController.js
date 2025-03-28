import StudentModel from "../models/studentmodel.js";

export function postStudent(req, res) {
  const student = new StudentModel(req.body);
  student
    .save()
    .then(() => {
      res.json({
        message: "student saved",
        data: student,
      });
    })
    .catch((err) => {
      res.json(err);
    });
}

export function getStudents(req, res) {
  StudentModel.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.json(err);
    });
}

export function putStudent(req, res) {
  res.json({ message: "update student" });
}

export function deleteStudent(req, res) {
  res.json({ message: "delete student" });
}
