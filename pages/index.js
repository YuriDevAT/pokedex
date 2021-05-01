import Link from 'next/link';
import Layout from '../components/Layout';
import Image from 'next/image';
import { useState } from 'react';

const Home = ({ pokedex }) => {

    return (
        <Layout title="Pokedex">
            <div className="flex flex-col w-60 mx-auto">
                <h1 className="text-4xl mb-4 font-bold text-center">25 years of</h1>
                <Image
                src="/pokemon.png"
                alt="pokemon-font"
                width={200}
                height={70}
                />            
            </div>
            <h2 className="text-xl mt-8 font-semibold ml-7">Pokédex</h2>
            <ul className="flex flex-wrap justify-around">
                {pokedex.map((pokemon, index) => (
                    <li key={index} className="w-40">
                        <Link href={`/pokedex?id=${index + 1}`}>
                            <a className="border p-4 my-2 hover:shadow-md flex flex-col items-center text-sm rounded-md bg-gray-200">
                                <img
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    className="w-20 h-20 mr-3"
                                />
                                <p className="flex">
                                  {index + 1}. 
                                  <span className="uppercase ml-1">
                                    {pokemon.name}
                                    </span>
                                </p>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

export default Home;

export async function getStaticProps(context) {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
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


// function getPokemonData() {
//     fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
//         .then((res) => res.json())
//         .then((pokemonData) => {
//             const results = pokemonData.results;
//             results.forEach((results) => {
//                     fetchPokemonData(results)
//             })
//             return {
//                 props: { pokemonData },
//             }
//         })
//         .catch((e) => console.log(e))
// }

// function fetchPokemonData(pokemon){
//     let url = pokemon.url 
//       fetch(url)
//       .then(response => response.json())
//       .then(function(pokeData){
//           const type = pokeData.types.type;
//           const name = pokeData.name;
//           const paddedId = ('00' + (index + 1)).slice(-3);
//           const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
//           return { ...name, image, type };      
//     });
//     return {
//         props: { pokeData },
//     }
//   }
        // add pokeData to state here, that is what contains all the data you need
