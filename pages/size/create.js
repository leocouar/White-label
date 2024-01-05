import SEO from "@/components/SEO";
import StoreHeading from "@/components/StoreHeading";
import NewSize from "@/components/sizes/NewSize";
import withAuthorization from 'components/withAuthorization';

const Create = () => {
    return (
        <>
        <SEO title="Cargar nuevo talle" />
        <div className="min-h-screen">
            <StoreHeading title="Talles"/>
            <NewSize/>
        </div>
        </>
    );
}

export default withAuthorization(Create);