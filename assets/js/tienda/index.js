/**
 * Data
 */


/**
 * React
 */
ReactDOM.render(
    <App />,
    document.getElementById('tienda-content')
)


function App({ categorias }) {

    return (
        <div>
            <h1>REACTAPP</h1>
            <SideNav categorias={categorias} />
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