/** DB-CON */
const instance = axios.create({
  baseURL: 'http://127.0.0.1:80'
});

var categorias = []
var productos = []
var marcas = []
async function getData(val) {
  try {
    //  const response= await instance.get("/categorias");
    const cat = await instance.get("/categorias");
    const prod = await instance.get("/producto");

    cat.data.forEach(element => {
      categorias.push(element)
    });
    prod.data.forEach(element => {
      productos.push(element)
    });
    if(val != undefined){
    val(categorias,productos)
    }
    console.log("GET DATA END")
  } catch (error) {
    console.error(error);
  }
}



// Tienda(null,null)
getData();



function Tienda(cat,prod){
if(cat == null || prod == null){
  getData(Tienda)
}
  
  ReactDOM.render(
    <App categorias={categorias}/>,
    document.getElementById('tienda-content')
  )
  
}

function App({categorias}) {

  function mylog(val){
    console.log(val)
  }
  
  return (
    <div>
      <h1>REACTAPP</h1>
      <SideNav categorias={categorias}/>
    </div>
  );
}

function SideNav() {
  return (
    <div id="sidenav" class="container">
      <h1>side-nav</h1>
    </div>
  );
}