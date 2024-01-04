import SEO from "@/components/SEO";
import StoreHeading from "@/components/StoreHeading";
import NewBrand from "@/components/brands/NewBrand";
import withAuthorization from 'components/withAuthorization';

const Create = () => {
    return (
        <>
        <SEO title="Nueva Marca" />
        <div className="min-h-screen">
            <StoreHeading title="Marcas"/>
            <NewBrand/>
        </div>
        </>
    );
}

export default withAuthorization(Create);
