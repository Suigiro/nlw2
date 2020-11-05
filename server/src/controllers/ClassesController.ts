import { Request, Response} from 'express';
import db from '../database/connection';
import convertHourToMin from '../utils/convertHourToMin';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController{
    async index(request:Request, response:Response){
        const filters = request.query;
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string; 

        if(!week_day || !subject || !time){
            return response.status(400).json({
                error: "Missing filters to search"
            });
        }

        const timeInMinutes = convertHourToMin(time);

        const classes = await db('classes')
        .whereExists(function(){
            this.select('schedule.*')
            .from('schedule')
            .whereRaw('`schedule`.`id` = `schedule`.`id`')
            .whereRaw('`schedule`.`week_day` = ??',[Number(week_day)])
            .whereRaw('`schedule`.`from` <= ??',[timeInMinutes])
            .whereRaw('`schedule`.`to` > ??',[timeInMinutes])
        })
        .where('classes.subject','=',subject)
        .join('users','classes.user_id','=','users.id')
        .select(['classes.*','users.*']);

        return response.json(classes);
    }   
    async create (request:Request, response:Response){   
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
        const trx = await db.transaction();
      try {
        
        const insertedUserIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio
        });
    
        const user_id = insertedUserIds[0];
    
        const insertedClassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id
        });
    
        const classes_id = insertedClassesIds[0];
    
        const classeSchedule = schedule.map((item:ScheduleItem)=>{
            return {           
                    week_day: item.week_day,
                    from: convertHourToMin(item.from),
                    to: convertHourToMin(item.to),
                    classes_id: classes_id,
                };
        });
    
        await trx('schedule').insert(classeSchedule);
    
        await trx.commit();
    
        return response.status(201).send({
            Message:"Cadastrado com Sucesso"
        });

      } catch (error) {
          await trx.rollback();
          return response.status(400).json({
              error: 'Unexpected error'
          })
      }
    }
}