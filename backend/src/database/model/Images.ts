import {Entity,Column,PrimaryGeneratedColumn,ManyToOne, JoinColumn} from 'typeorm';
import orphanages from '../../controller/orphanages';
import Orphanage from './Orphanage';

@Entity('images')
export default class Images{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    path:string;

    @ManyToOne(()=> Orphanage, orphanages => orphanages.images)
    @JoinColumn({name:'orphanateId'})
    orphanage:Orphanage;



}