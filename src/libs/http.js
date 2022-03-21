class Http {
    
    static instance = new Http();
    static URL = "http://81.171.6.88/web/api/";

    get = async (url) => {
        try {
            let req = await fetch(url);
            let json= await req.json();
            return json;
        } catch (error) {
            console.log("Error en el http get",error);
            throw Error(error);
        }
    }

    post = async (url, body) => {
        try {
            let req = await fetch(url,{
                method:"POST",
                body
            });
            let json=await req.json();
            return json;
        } catch (error) {
            alert(error);
            console.log("Error en el http post",error);
            throw Error(error);
        }
    }
}

export default Http;