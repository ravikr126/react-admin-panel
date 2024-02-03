import React from 'react'
import { useState } from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constants'

const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
    return (
        <div className="bg-neutral-900 w-60 p-3 flex flex-col">
            <div className="flex items-center gap-2 px-1 py-3">
                <img src="https://www.fouressindia.com/wp-content/uploads/2019/09/logo-1.png" alt="Fouress Group" />
            </div>
            <div className="py-8 flex flex-1 flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
                <div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    )
}

function SidebarLink({ link }) {
    const { pathname } = useLocation()
    const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false)

    const handleSubcategoryToggle = () => {
        setIsSubcategoryOpen(!isSubcategoryOpen)
    }

    return (
        <>
            <Link
                to={link.path}
                onClick={link.subcategories ? handleSubcategoryToggle : undefined}
                className={classNames(
                    'cursor-pointer',
                    linkClass,
                    pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400'
                )}
            >
                <span className="text-xl">{link.icon}</span>
                {link.label}
                {link.subcategories && <span className="ml-auto">{isSubcategoryOpen ? '▲' : '▼'}</span>}
            </Link>

            {/* Render subcategories if they exist and the dropdown is open */}
            {link.subcategories && isSubcategoryOpen && (
                <div className="pl-6">
                    {link.subcategories.map((subcategory) => (
                        <Link
                            key={subcategory.key}
                            to={subcategory.path}
                            className={classNames(
                                pathname === subcategory.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
                                linkClass
                            )}
                        >
                            <span className="text-xl">{subcategory.icon}</span>
                            {subcategory.label}
                        </Link>
                    ))}
                </div>
            )}
        </>
    )
}
