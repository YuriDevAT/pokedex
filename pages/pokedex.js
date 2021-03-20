import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';

const pokedex = ({ pokemon }) => {

    return (
        <Layout title={pokemon.name}>
            <h1 className="text-4xl mb-2 text-center capitalize">
                {pokemon.id}. {pokemon.name}
            </h1>
            <img className="mx-auto" src={pokemon.image} alt={pokemon.name} />
            <div className="text-center">
                <p>
                    <span className="font-bold mr-2">Weight:</span>
                    {pokemon.weight}
                </p>
                <p>
                    <span className="font-bold mr-2">Height:</span>
                    {pokemon.height}
                </p>
                <h2 className="text-2xl mt-6 mb-2">Type</h2>
                {pokemon.types.map((type, index) => (
                    <p key={index}>{type.type.name}</p>
                ))}            
                <div className="mt-8 mx-auto max-h-full">
                    <Link href="/">
                        <a>
                        <p className="font-semibold">return to</p>
                        <Image src='/pokedex.png' alt='pokedex-font' width={120} height={40} />
                        </a>
                    </Link>
                </div>    
            </div>        
        </Layout>
    );
}

export default pokedex;

export async function getServerSideProps({ query }) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await res.json();
        const paddedId = ('00' + id).slice(-3);
        pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return {
            props: { pokemon },
        };
    } catch (err) {
        console.error(err);
    };
}