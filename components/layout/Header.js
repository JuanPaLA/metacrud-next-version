import React, {useEffect} from "react";
import Link from 'next/link';


export default function Header() {

  return (
    <div className="box">
      <Link href={'/'}><h1>Header</h1></Link>       
    </div>
  );
}