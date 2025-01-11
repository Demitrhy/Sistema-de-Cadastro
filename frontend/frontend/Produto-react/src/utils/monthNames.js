import moment from 'moment';
import brLocate from 'moment/locale/pt-br.js';

export const monthNames = (month = 0) =>{
    moment.updateLocale('pt-br', [brLocate]);
    
    return moment().add(month, 'month').format('MMMM YYYY');
}