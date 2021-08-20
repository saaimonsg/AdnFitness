

/**
 * Data
 */

var ListaCategorias =  fetch("assets/js/tienda/json/categorias.json")
    .then(response => response.json());

var ListaProductos = fetch("assets/js/tienda/json/productos.json")
    .then(response => response.json());

 //console.log(ListaCategorias)
// console.log(ListaProductos)
/**
 * React
 */
ReactDOM.render(
    <App/>,
    document.getElementById('tienda-content')
)


function App() {
    return (
        <div className="row">
            <div className="col-sm-2">
                <SideNav categorias={ListaCategorias}/>
            </div>
        </div>
    );
}

function SideNav({categorias}) {

     var children=  []

    function completarCat() {

        console.log("completarCat");
        const element = document.getElementById("sidenav");

        categorias.then(result => {
            for (let i = 0; i < result.length; i++) {
                //console.log(result[i]['categoria'])
               children.push( <HeaderButton name={result[i]['categoria']}/> )
            }
        });
        console.log(children.length, children, categorias.)



    }

    return (
        <div id="sidenav" class="">
                {completarCat()}
        </div>
    );
}


function HeaderButton({name}) {
    return (
        <h2 className="sec-title__title">
            <Link to="#">{name}</Link>
        </h2>
    );
}