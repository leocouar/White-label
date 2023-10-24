import NewRecipe from "@/components/recipes/NewRecipe";
import StoreHeading from "@/components/StoreHeading";


const Create = ({}) => {
    return(
        <div className="min-h-screen">
            <StoreHeading title="Nueva Receta"/>
            <NewRecipe />
        </div>
    )
}

export default Create;