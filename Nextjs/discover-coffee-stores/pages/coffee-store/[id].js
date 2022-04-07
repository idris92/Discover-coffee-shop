import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Head from 'next/head';
import styles from '../../styles/coffee-store.module.css'
import Image from 'next/image';
import cls from 'classnames'
import coffeeStoreData from '../../data/coffee-stores.json'

export function getStaticProps({params}){
    // const params = staticProps.params;
    // console.log('params', params.id);
    //accessing the click id is done using params in nextjs or without destructing we can use staticProps.params
    return {
        props:{
            //since we want it to return the one click by the use which is dynamic
            coffeeStore: coffeeStoreData.find((coffeeStore)=>{
                return coffeeStore.id.toString() === params.id
            })
        }
    }
}

export function getStaticPaths(){
    const paths = coffeeStoreData.map((coffeeStore)=>{
        return {
            params:{
                id:coffeeStore.id.toString(),           }
        }
    })
    return{
        paths,
        fallback:true
    }
}


const coffeeStore = (props) => {
    const router = useRouter();
    if(router.isFallback){
        return <div>Loading...</div>
    }
    const {name, address, neighbourhood, imgUrl} = props.coffeeStore;

    const handleUpvoteButton=()=>{
        console.log('handle upvote')
    }
    return (
        <div>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                <div className='backToHomeLink'>
                    <Link href='/'><a>Back to Home</a></Link>
                </div>
                {/* for dynamic route you put /dynamic*/}
                {/* <Link href='/coffee-store/dynamic'><a>Go to Dynamic</a></Link>
                <h1>Coffee shop {router.query.id}</h1> */}
                <div className={styles.nameWrapper}>
                    <h1 className={styles.name}>Name:<span>{name}</span></h1>
                </div>
                <Image src={imgUrl} width={600} height={360} className={styles.storeImg} alt={name}/>
                </div>
                <div className={cls('glass',styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src='/static/icons/places.svg' width='24' height='24' alt=''/>
                        <p className={styles.text}>{address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src='/static/icons/nearMe.svg'  width='24' height='24' alt=''/>
                        <p className={styles.text}>{neighbourhood}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src='/static/icons/star.svg'  width='24' height='24' alt=''/>
                        <p className={styles.text}>1</p>
                    </div>
                    <button className={styles.upvoteButton} onClick={handleUpvoteButton}> Up vote</button>
                </div>
            </div>
        </div>
    )
}

export default coffeeStore
