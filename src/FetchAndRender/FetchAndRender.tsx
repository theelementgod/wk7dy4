import { useEffect, useState } from "react"

const FetchAndRender = () => {

    interface IInfo {
        num: number,
        name: string,
        url: string
    }

    const [info, setInfo] = useState<IInfo>({
        num: 0,
        name: '',
        url: ''
    })


    useEffect(() => {
        getNum()
    }, [info.num])

    const url = 'https://spotify23.p.rapidapi.com/artist_albums/?id=2w9zwq3AktTeYYMuhMjju8&offset=0&limit=100';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '219d28c553msh529be108020c610p1f4e77jsn314488bf4a8d',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}};

    const getNum = async () => {
        const response = await fetch(url, options)
        const data = await response.json()
        const albumName = (data.data.artist.discography.albums.items[info.num].releases.items[0].name)
        const albumCover = (data.data.artist.discography.albums.items[info.num].releases.items[0].coverArt.sources[0].url)
        setInfo({...info, name: albumName, url: albumCover})
        console.log(albumName)
        console.log(albumCover)
    }

  return (
    <>
        <h1 className="text-center">Click to cycle through album art!</h1>
        <h1 className="text-center">{info.num}</h1>
        <div className="w-25 mx-auto">
            <button onClick={(event) => {
                info.num === 0 ? setInfo({...info, num: 10}) : setInfo({...info, num: (info.num - 1)})}}>Previous</button>
            <button onClick={(event) => {
                info.num === 10 ? setInfo({...info, num: 0}) : setInfo({...info, num: (info.num + 1)})}}>Next</button>
        </div>
        <ul className="text-center">
        {info.name}
        <br />
        <img src={info.url} alt="" />
        </ul>
    </>
  )
}
export default FetchAndRender