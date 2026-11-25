"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { COMPANY } from "@/lib/company";

const links = [
	{ href: "#ana-icerik", label: "Ana Sayfa" },
	{ href: "#hizmetler", label: "Hizmetler" },
	{ href: "#isler", label: "İşlerimiz" },
	{ href: "#studyo", label: "Hakkımızda" },
	{ href: "#iletisim", label: "İletişim" },
];

export function SiteHeader() {
	const [menuOpen, setMenuOpen] = useState(false);
	const toggle = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!menuOpen) return;
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setMenuOpen(false);
				toggle.current?.focus();
			}
		}
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [menuOpen]);

	function goToSection(href: string) {
		setMenuOpen(false);
		requestAnimationFrame(() => {
			document.querySelector<HTMLElement>(href)?.focus({ preventScroll: true });
		});
	}

	return (
		<header className="studio-header">
			<a className="skip-link" href="#ana-icerik">
				İçeriğe geç
			</a>
			<div className="studio-shell studio-header__inner">
				<a
					className="agency-header__brand"
					href="#ana-icerik"
					aria-label="BK Media House ana sayfa"
				>
					<Image
						src={COMPANY.logo}
						alt="BK Media House"
						width={180}
						height={54}
						sizes="180px"
						priority
					/>
				</a>
				<nav className="studio-desktop-nav" aria-label="Ana menü">
					{links.map((link) => (
						<a key={link.href} href={link.href}>
							{link.label}
						</a>
					))}
				</nav>
				<a className="studio-header__contact" href="#iletisim">
					Teklif al <ArrowUpRight size={17} />
				</a>
				<button
					ref={toggle}
					className="studio-menu-toggle"
					aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
					aria-expanded={menuOpen}
					aria-controls="studio-mobile-nav"
					type="button"
					onClick={() => setMenuOpen((open) => !open)}
				>
					{menuOpen ? <X size={22} /> : <Menu size={22} />}
				</button>
			</div>
			<nav
				id="studio-mobile-nav"
				className="studio-mobile-nav"
				aria-label="Mobil menü"
				hidden={!menuOpen}
			>
				{links.map((link, index) => (
					<a
						key={link.href}
						href={link.href}
						onClick={() => goToSection(link.href)}
					>
						<span>0{index + 1}</span>
						{link.label}
						<ArrowUpRight size={22} />
					</a>
				))}
			</nav>
		</header>
	);
}
