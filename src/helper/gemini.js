require("dotenv").config();
const { GoogleGenerativeAI ,SchemaType} = require("@google/generative-ai");

const run=async(prompt)=>
    {
        try{
            const genAI = new GoogleGenerativeAI("AIzaSyAr9Azi0PGIadM9oMAfuytqNw92gdSSfQo");
            
            const schema = {
                description: `${prompt} Cryptocurrency Information`,
                type: SchemaType.OBJECT,
                   properties: {
                    aboutbitcoin: {
                      type: SchemaType.STRING,
                      description: `What is ${prompt} I in 5 lines`,
                      nullable: false,
                    },
                    itsValue: {
                        type: SchemaType.STRING,
                        description: `why does ${prompt} I have value a paragraph`,
                        nullable: false,
                      },
                    inflation: {
                        type: SchemaType.STRING,
                        description: `No inflation in ${prompt} I a paragraph`,
                        nullable: false,
                      },
                      whobuilt:{
                        type: SchemaType.STRING,
                        description: `who bulit ${prompt} I a paragraph`,
                        nullable: false,
                      },
                      technology:{
                        type: SchemaType.STRING,
                        description: `The technology of ${prompt} I a paragraph`,
                        nullable: false,
                      }
                  },
                  required: ["aboutbitcoin","itsValue","inflation","whobuilt","technology"],
                };

             const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
          });

             const result = await model.generateContent(`Give information about ${prompt}`);
              
             try{
                const  infoObject=JSON.parse(result.response.text());
                console.log(infoObject?.aboutbitcoin);
                return result.response.text();
             }
             catch(error)
             {
              console.log("Error in parsing:",error);
             }
        }
        catch(error)
        {
            console.log(error);
        }
}


module.exports=run;




