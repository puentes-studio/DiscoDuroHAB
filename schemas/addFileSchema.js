import joi from 'joi';
import imgSchema from '../imgSchema.js';

const addPhotosSchema = joi.object({
    photo: imgSchema.required()
});

export default addPhotosSchema;
