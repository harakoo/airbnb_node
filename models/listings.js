const listing =
{

    fakeDB : [],

    init()
    {

        this.fakeDB.push({image:'/img/Lakeview City.png',title:`Lakeview City Condo`,price:`200`});
    
        this.fakeDB.push({image:'/img/Condominium Close to CN Tower.png',title:`Bright Welcoming Condominium Close to CN Tower`,price:`250`});
    
        this. fakeDB.push({image:'/img/Vintage Style Apartment in Historic Annex.png',title:`Vintage Style Apartment in Historic Annex`,price:`300`});

        this. fakeDB.push({image:'/img/Rooftop.png',title:`Breathtaking 360° City Views from the Rooftop `,price:`270`});
    },
    getallListings()
    {
        return this.fakeDB;
    }

}


listing.init();
module.exports=listing;