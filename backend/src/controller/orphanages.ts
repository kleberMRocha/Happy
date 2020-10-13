import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanages from "../database/model/Orphanage";
import orphanages_view from "../database/views/orphanages_view";
import * as Yup from "yup";

export default {
  async create(req: Request, res: Response) {
    const reqFiles = req.files as Express.Multer.File[];

    const images = reqFiles.map((files) => {
      return { path: files.filename };
    });

    const {
      nome,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const data = {
      nome,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })),
    });

    await schema.validate(data,{
      abortEarly:false
    }).catch((err) =>{

      let validationErros:any = [];

      err.errors.forEach((element:string) => {
        validationErros.push({Error:element})
      });

     return res.status(400).json(validationErros);

    });

    const orphanagesRepository = getRepository(Orphanages);

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
  },
  async index(req: Request, res: Response) {

    const orphanagesRepository = getRepository(Orphanages);

    const orphanages = await orphanagesRepository.find({
      relations: ["images"],
    });

    return res.json(orphanages_view.renderMany(orphanages));
    
  },
  async show(req: Request, res: Response) {

    const orphanagesRepository = getRepository(Orphanages);
    const idOrphanete = req.params.id;
    const orphanages = await orphanagesRepository.findOneOrFail(idOrphanete, {
      relations: ["images"],
    });

    return res.json(orphanages_view.render(orphanages));
  },
};
