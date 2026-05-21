"use client";
import React from "react";
import { BackgroundBeams } from "../background-beams";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import Image from "next/image"



export default function Footer() {
  return (
   
     <footer className=" text-white md:h-[30rem] h-full w-full bg-neutral-950 relative flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-5">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Image 
                                          src='/zaby-white.svg' 
                                          alt='logo' 
                                          width={ 140} 
                                          height={140}
                                          className="transition-all duration-500 w-18 h-auto" 
                                      />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI-driven, cross-generational learning ecosystem designed to personalize and optimize skill acquisition
              through our proprietary PRISM Framework.
            </p>
            <div className="flex space-x-3">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full cursor-pointer h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                onClick={() => window.open('https://x.com/ZabyAi123', '_blank')}
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full cursor-pointer h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                onClick={() => window.open('https://www.linkedin.com/company/zaby-ai/', '_blank')}
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button
              size="icon"
              variant="ghost"
              className="rounded-full cursor-pointer h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={()=>window.open("https://www.instagram.com/zaby.tech/",'_blank')}
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full cursor-pointer h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">GitHub</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full cursor-pointer h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                onClick={() => window.open('https://youtube.com/@genzaby?si=2q3z-hEwlhKxkzDz', '_blank')}
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.68 22 12 22 12s0 3.32-.42 4.814c-.23.861-.907 1.538-1.768 1.768C18.32 19 12 19 12 19s-6.32 0-7.814-.418c-.861-.23-1.538-.907-1.768-1.768C2 15.32 2 12 2 12s0-3.32.418-4.814c.23-.861.907-1.538 1.768-1.768C5.68 5 12 5 12 5s6.32 0 7.812.418zM9.75 15.023L15.5 12 9.75 8.977v6.046z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6">
            <div>
              <h3 className="md:text-sm  font-semibold text-gray-100 uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/business" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Business
                  </Link>
                </li>
                <li>
                  <Link href="/creators" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Creators  
                  </Link>
                </li>
                <li>
                  <Link href="/workflow" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    WorkFlow
                  </Link>
                </li>
                <li>
                  <Link href="/products/interview" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Zaby Interview
                  </Link>
                </li>
                <li>
                  <Link href="/products/cert-prep" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Zaby Prep
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">
               
            </h3>
            {/* <p className="text-gray-300 text-sm">
              Get the latest updates on AI learning research and product announcements.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
              />
              <Button className="bg-purple-500 hover:bg-purple-700 cursor-pointer">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div> */}
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3 ">
              <li className="flex items-start space-x-3  ">
                <div className=' flex space-x-3 '>
                <Mail className="h-5 w-5 text-white/50 mt-0.5" />
                <span className="text-gray-300">hello@zaby.io</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className=' flex space-x-3 '>
                <MapPin className="h-5 w-15 text-white/50 mt-0.5" />
                <span className="text-gray-300"> Plot No.25, Srujana, Lakshmi Nagar Colony, Ameenpur, Ramachandrapuram, Medak- 502032, Gachibowli, Telangana, India</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
<div className=' flex space-x-3 '>
                <Phone className="h-5 w-5 text-white/50 mt-0.5" />
                <span className="text-gray-300">+91-8523871114 </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

            <div className="mt-10 md:pt-8 border-t border-gray-800">
        <div className="flex md:flex-row items-center justify-center md:justify-start space-x-3 md:space-x-6 mb-4">
          <Image
            src="/iso-9001.png"
            alt="ISO 9001 Certification"
            width={150}
            height={30}
            className="mt-4 md:mt-0 md:w-22 h-15 md:h-22 w-15 cursor-pointer"
            onClick={() => window.open('https://www.iafcertsearch.org/certification/CBGrJHgQD06uUl9n4SzLujlK','_blank')}
            />
            <Image
            src="/iso-27001.png"
            alt="ISO 27001 Certification"
            width={150}
            height={30}
            className="mt-4 md:mt-0 md:h-22 h-15 md:w-22 w-15 cursor-pointer"
            onClick={() => window.open('https://www.iafcertsearch.org/certification/NSfA7vSho5dy4E9oDojNiXbX','_blank')}

            />

            </div>

        <div className=" flex flex-col md:flex-row justify-between items-center mb-4">

          <p className="text-sm text-gray-400">© 2025 GEN ZABY AI SOLUTIONS PRIVATE LIMITED</p>

          <div className="flex space-x-6 mt-4 md:mt-0 pb-1">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white hover:underline underline-offset-2 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/termsandcondition" className="text-sm text-gray-400 hover:text-white hover:underline underline-offset-2 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-gray-400 hover:text-white hover:underline underline-offset-2 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
            </div>
      <BackgroundBeams />
    </footer>
   
  );
}



