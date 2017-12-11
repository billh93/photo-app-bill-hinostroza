import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class Sticky extends Component {
    componentDidMount() {
        const setInitialHeights = (elements) => {
            [].forEach.call(elements, (sticky) => {
                sticky.setAttribute('datastickyinitial', sticky.getBoundingClientRect().top);
            });
        };

        const stickies = document.querySelectorAll('[datasticky]');
        setInitialHeights(stickies);

        document.addEventListener('scroll', () => {
            const top = document.documentElement.scrollTop || document.body.scrollTop;
            const bottom = document.documentElement.scrollHeight || document.body.scrollHeight;

            [].forEach.call(stickies, (sticky) => {
                const stickyInitial = parseInt(sticky.getAttribute('datastickyinitial'), 10);
                const stickyEnter = parseInt(sticky.getAttribute('datastickyenter'), 10) || stickyInitial;
                const stickyExit = parseInt(sticky.getAttribute('datastickyexit'), 10) || bottom;

                if (top >= stickyEnter && top <= stickyExit) {
                    sticky.classList.add('sticky');
                } else {
                    sticky.classList.remove('sticky');
                }
            });
        });
    }

    render() {
        const {className, enter, exit, children} = this.props;
        return (<div className={`Sticky ${className}`} datasticky="datasticky" datastickyenter={enter} datastickyexit={exit}>
            {children}
        </div>);
    }
}

Sticky.propTypes = {
    className: PropTypes.string,
    enter: PropTypes.string,
    exit: PropTypes.string,
    children: PropTypes.node
};
