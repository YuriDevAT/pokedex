import Link from 'next/link';
import Layout from '../components/Layout';

const Home = ({ pokedex }) => {

    return (
        <Layout title="Pokedex">
            <h1 className="text-4xl mb-8 text-center">25 years of Pokémon</h1>
            <h2 className="text-xl mb-8 text-center">Pokédex</h2>
            <ul>
                {pokedex.map((pokemon, index) => (
                    <li key={index}>
                        <Link href={`/pokemon?id=${index + 1}`}>
                            <a className="border p-4 border-grey my-2 hover:shadow-md capitalize flex items-center text-lg bg-gray-200 rounded-md">
                                <img
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    className="w-20 h-20 mr-3"
                                />
                                <span className="mr-2 font-bold">
                                    {index + 1}.
                                </span>
                                {pokemon.name}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

export default Home;

export async function getStaticProps() {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const { results } = await res.json();
        const pokedex = results.map((pokemon, index) => {
            const paddedId = ('00' + (index + 1)).slice(-3);
            const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
            return { ...pokemon, image };
        });
        return {
            props: { pokedex },
        };
    } catch (err) {
        console.error(err);
    };
}