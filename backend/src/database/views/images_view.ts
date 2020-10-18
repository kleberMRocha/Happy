import Images from '../model/Images';

export default {
    render(image:Images){
        return{
                id:image.id,
                url: `http://192.168.0.14:4000/upload/${image.path}`,
        };
    },
    renderMany(image:Images[]){
        return image.map(img => this.render(img))
    }
};