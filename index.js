const express=require('express');
const port = 8000;
const path=require('path');
const db=require('./config/mongoose');
const Todo=require('./models/todo')
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var todoList=[{
    description:"do this work before deadline",
    date:1/11/19,
    category:"work"
}]
//create a controller to fetch the data 
app.get('/',function(req,res){
    Todo.find({},function(err,todos){
        if(err){
            console.log('error in fetching the data');
            return;
        }
        return res.render('index',{
            title:"todo list",
            todo_list:todos
        });
    })
    
})

//create controller to create an object in database
app.post('/create-todo',function(req,res){
    Todo.create({
        description:req.body.description,
        date:req.body.date,
        category:req.body.category
    },function(err,newTodo){
        if(err){
            console.log('error in creating a task');
            return;
        }
        console.log('********',newTodo);
        return res.redirect('back');
    })
})


//create controller to delete an object from database
app.get('/delete-todo',function(req,res){
    let id=req.query.id;
    Todo.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    })
});

app.listen(port,function(err){
    if(err){
        console.log('error:',err);
    }
    console.log('server is running at port number:',port);
})