const express = require('express');
const app = express();

app.use(express.json());

const students = [
    {id: 1, name:'GG1',age:20,enroll:true},
    {id: 2, name:'GG2',age:21,enroll:false},
    {id: 3, name:'GG3',age:22,enroll:true},
    {id: 4, name:'GG4',age:30,enroll:false},
];

app.get('/',(req,res)=>{
    res.send("node js api");
});


app.get('/api/students',(req,res)=>{
    res.send(students);
});

app.get('/api/students/:id', (req, res)=>{
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send("no se encontro");
    else res.send(student);
});

app.post('/api/students',(req,res)=>{
    const student = {
        id:students.length +1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === "true")
    };
    students.push(student);
    res.send(student);
});


app.delete('/api/students/:id',(req,res)=>{
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send("no se encontro");
    const index = students.indexOf(student);
    students.splice(index,1);
    res.send(student);
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`escuchando puerto ${port} ...`));