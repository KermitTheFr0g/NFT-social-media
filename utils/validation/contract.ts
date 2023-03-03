import Joi from 'joi';

interface paramInterface {
    projectName: string;
    projectAbbreviation: string;
    maxSupply: number;
    mintPrice: number;
    maxPerWallet: number;
    ipfsAddress: string;
}

const contractValidation = (contractParams: paramInterface) => {

    const contractSchema = Joi.object({
        projectName: Joi.string()
            .required()
            .min(3)
            .max(30),
    
        projectAbbreviation: Joi.string()
            .required()
            .min(2)
            .max(5),
        
        maxSupply: Joi.number()
            .required()
            .integer(),
    
        mintPrice: Joi.number()
            .required()
            .min(0)
            .max(999),
    
        maxPerWallet: Joi.number()
            .required()
            .integer()
            .min(0)
            .max(999),
    
        ipfsAddress: Joi.string()
            .required()
            .max(999),
    })
    
    const paramValidation = contractSchema.validate(contractParams);

}
module.exports = contractValidation;