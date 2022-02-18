const Scene = ({scene}) => {
    console.log(scene);
    return ( 
    <div className="flex justify-center items-center h-screen">
        <div className="text-center">
            <div className="text-3xl mb-12 font-bold">Scene</div>
            <div className="text-2xl font-bold">{scene[0].scene}</div>
        </div>
    </div> );
}
 
export default Scene;