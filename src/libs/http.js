class Http {
    
    static instance = new Http();
    static URL = "http://askool.in/api/";

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
            console.log("Error en el http post",error,url,body);
            throw Error(error);
        }
    }
}

export default Http;