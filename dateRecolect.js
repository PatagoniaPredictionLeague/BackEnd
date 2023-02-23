import cron from 'node-cron'

import Competicion from "./database/models/Competicion.js";
import Fecha from "./database/models/Fecha.js";
import Partido from "./database/models/Partido.js";


const recolect = async (idComp) => {
    
    let response;
    
    const url = `https://livescore6.p.rapidapi.com/competitions/detail?CompId=${idComp}&Timezone=0`;
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9000e51be2msh129e85ca6efb0d6p19acbajsn2cc83cf7161a',
            'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
        }
    };
    
    await fetch(url, options)
    .then(res => res.json())
    .then(json => response = json)
    .catch(err => console.error('error:' + err));
    
    return response;
}

export const matches = async (idComp) => {
    let comp = await recolect(idComp);
    
    if(comp){
        let compSaved = await Competicion.findByPk(comp.CompId);
        if(!compSaved){
            await Competicion.create( {
                id:comp.CompId,
                name : comp.CompN
            })
        }
        let stages = comp.Stages;
        stages.forEach(async stage => {
            let stageSaved = await Fecha.findByPk(stage.Sid);
            if(!stageSaved){
                await Fecha.create( {
                    id:stage.Sid,
                    name : stage.Snm,
                    competicionId : comp.CompId
                })
            }
            let matches = stage.Events;
            matches.forEach(async match => {
                let matchSaved = await Partido.findByPk(match.Eid);
                if(!matchSaved){
                    await Partido.create( {
                        id:match.Eid,
                        local : match.T1[0].Nm,
                        visitante : match.T2[0].Nm,
                        fechaHora : intToDate(match.Esd),
                        fechaId : stage.Sid
                    })
                }
            })
            
        });
    }
}

function intToDate(input) {
    input = input.toString();
    const year = input.slice(0, 4);
    const month = input.slice(4, 6);
    const day = input.slice(6, 8);
    const hour = input.slice(8, 10);
    const minute = input.slice(10, 12);
    const second = input.slice(12, 14);
    return new Date(Date.UTC(year, month-1, day, hour, minute, second));
}

cron.schedule('0 0 * * *', async function() {
    await matches(60);
});