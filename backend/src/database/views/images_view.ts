import Images from '../model/Images';

export default {
    render(image:Images){
        return{
                id:image.id,
                url: `http://localhost:4000/upload/${image.path}`,
        };
    },
    renderMany(image:Images[]){
        return image.map(img => this.render(img))
    }
};