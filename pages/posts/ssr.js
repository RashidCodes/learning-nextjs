import axios from 'axios'

export async function getServerSideProps({ context }) {
    // fetch data from external API 
    const { data } = await axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/todos/1'
    })

    return { props: { data } }
}


export default function SSRPage({ data }) {
    return (
        <div>This is a server-side rendered page: { data.title }</div>
    )
}