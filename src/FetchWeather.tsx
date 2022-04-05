import {useState, useEffect} from 'react';

export default function FetchWeather() {
    const [fetchPos, setFetchPos] = useState<any>();
    const [fetchData, setFetchData] = useState<any>();
    const [doneWeather, setDoneWeather] = useState<any>();
    const [doneCity, setDoneCity] = useState<any>();

    /* Recupérer Position Ville */
    useEffect(() => {
        fetch(`https://api-adresse.data.gouv.fr/search/?q=marseille&limit=1`)
        .then(pos => pos.json())
        .then(data => {
            setFetchPos(data)
        })
        .catch(data => window.alert("bug" + data))
    }, []);

    /* Récupérer Température Ville */
    useEffect(() => {
        if(fetchPos){
            setDoneCity(fetchPos.features[0].properties.city + ", " + fetchPos.features[0].properties.context);
            fetch(`https://www.infoclimat.fr/public-api/gfs/json?_ll=${fetchPos.features[0].geometry.coordinates[1]},${fetchPos.features[0].geometry.coordinates[0]}&_auth=Bx0FElUrACIEKVtsAHYHLgdvBzIBdwcgA39SMQhtVSgCaQdmBGRTNVY4VyoEKwQyVXgObVliADACaQB4C3lWNwdtBWlVPgBnBGtbPgAvBywHKQdmASEHIANhUjIIY1UoAmAHZgRmUy9WPVcwBCoEOFVgDnFZeQA5AmcAYwtvVjUHbAVhVTMAawRsWyYALwc1BzYHYwFvB2kDaVI0CGBVNwJmBzYEMVNgVjFXKwQzBDZVYA5pWWAAPgJiAGYLeVYqBx0FElUrACIEKVtsAHYHLgdhBzkBag%3D%3D&_c=1bc0b545d2bd224bdfee2bae0a406d6c`)
            .then(pos => pos.json())
            .then(data => {
                setFetchData(data)
            })
            .catch(data => window.alert("bug" + data))
        }
    }, [fetchPos])

    /* Affichage Résultat */
    useEffect(() => {
        if(fetchData){
            var d = new Date();
            var date = d.getFullYear()+'-'+checkNumberDigits((d.getMonth()+1).toString())+'-'+checkNumberDigits(d.getDate().toString());
            setDoneWeather((fetchData[`${date} 14:00:00`].temperature["2m"] - 273.15).toFixed(1));
        }
    }, [fetchData])

    /* Fonction pour rajouter un 0 devant les chiffres */
    function checkNumberDigits(myNumber: string) {
        if ( myNumber.length < 2 )
        {
            return "0" + myNumber;
        }
        return myNumber;
    }

    return (
        <>Il fait {doneWeather}°C à {doneCity}</>
    )
}