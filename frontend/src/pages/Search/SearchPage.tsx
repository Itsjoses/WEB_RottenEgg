import Layout from "../GlobalComponent/LayoutComponent";
import ProductComponent from "../GlobalComponent/ProducComponent";
const Search = () => {
    return <Layout content={
        <ProductComponent type = "Search"/>
    }></Layout>;
}
 
export default Search;