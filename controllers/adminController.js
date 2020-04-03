const path = require('path');
const fs = require('fs');

const bcrypt = require('bcrypt')

const adminController = {
  index: (req, res) => {
    
    let fileNewsletter = path.join('db', 'newsletter.json');
    let listaNewsletter = fs.readFileSync(fileNewsletter, {encoding: "utf-8"});
    listaNewsletter = JSON.parse(listaNewsletter);
    
    let fileContato = path.join('db', 'contatos.json');
    let listaContato = fs.readFileSync(fileContato, {encoding: 'utf-8'});
    listaContato = JSON.parse(listaContato);


    res.render('admin', { title: 'Painel de controle', listaNewsletter, listaContato });
  },

show(req,res){

  res.render('cadastro',{title:'Cadastro'})

},store(req,res){
  let {nome,email,senha} = req.body

  let senhaC = bcrypt.hashSync(senha,10) 

  let user = {nome,email,senhaC, avatar:req.files[0].filename}

  let fileUser = path.join('db','users.json')

  let users = []

  if(fs.existsSync(fileUser)){

    users = fs.readFileSync(fileUser,{encoding:'utf-8'})

    users = JSON.parse(users)

  }

  users.push(user)

  users = JSON.stringify(users)

  fs.writeFileSync(fileUser,users)

  res.render('cadastro',{title:'Cadastro',mensagem:'Sucesso'})

  },

  showLogin(req,res){
    res.render('login',{title:'Login'})
  },

  verifyLogin(req,res){

    let {email,senha} = req.body

    let fileUser = path.join('db','users.json')

  if(fs.existsSync(fileUser)){

    let users = fs.readFileSync(fileUser,{encoding:'utf-8'})
    users = JSON.parse(users)

    let user = users.filter(us=>{
      return us.email==email
    })

    if(user[0]){

      if(bcrypt.compareSync(senha,user[0].senhaC)){

        return res.redirect('/')
  
      }else{
  
        return res.redirect('/login')
  
      }

    }else{

      res.render('login',{title:'Login',mensagem:'Usuário não existe!'})
      
    }
    
}
  }
};

module.exports = adminController;
