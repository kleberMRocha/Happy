import Orphange from '../model/Orphanage';
import Images_view from './images_view';

export default {
    render(orphanage:Orphange){
        return{
            
                id:orphanage.id,
                nome: orphanage.nome,
                latitude:orphanage.latitude,
                longitude: orphanage.longitude,
                about: orphanage.about,
                instructions: orphanage.instructions,
                open_on_weekends: orphanage.open_on_weekends,
                opening_hours: orphanage.opening_hours,
                images:Images_view.renderMany(orphanage.images)

            
        };
    },
    renderMany(orphanages:Orphange[]){
        return orphanages.map(orphanage => this.render(orphanage))
    }
};