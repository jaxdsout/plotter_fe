import { Form, FormField, Button, Icon, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { update_profile, update_avatar } from '../../store/actions/agent';
import { load_user } from '../../store/actions/auth';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Divider } from 'semantic-ui-react'

function Profile({ user, update_profile, update_avatar, load_user }) {
    const [formData, setFormData] = useState({
        trec: '',
        website: '',
        phone_number: '',
    });
    const { trec, website, phone_number } = formData;
    const [avatar, setAvatar] = useState(null);
    const [profileEdit, setProfileEdit] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const toggleEditProfile = () => {
        if (profileEdit) {
            setProfileEdit(false);
        } else {
            setProfileEdit(true);

        }
    };

    const handleProfileChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await update_profile(user, trec, website, phone_number);
            setProfileEdit(false);
            setLoading(false);
            await load_user();
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };


    const handleAvatarChange = e => setAvatar(e.target.files[0]);

    const handleAvatarSubmit = async (e) => {
        e.preventDefault();
        if (avatar) {
            try {
                setLoading(true);
                await update_avatar(user, avatar);
                setProfileEdit(false);
                setLoading(false);
                await load_user();
            } catch (err) {
                console.error('Error updating avatar:', err);
            }
        }
    };


    useEffect(() => {
        if (user) {
            setFormData({
                trec: user.profile.trec || '',
                website: user.profile.website || '',
                phone_number: user.profile.phone_number || '',
            });
        }
    }, [user]);


    return (
        <div className='flex flex-col items-center justify-center relative'>
            <div className='absolute top-0 right-0'>
                <Link onClick={toggleEditProfile}>
                    <Icon name='setting' size='large' />
                </Link>
            </div>

            <div className='flex flex-col items-center'>
                {user.profile.avatar === null ? (
                    <i className="user circle icon !text-[40px] !mt-2 !-mb-2"></i>
                ) : (
                    <img src={user.profile.avatar} className="rounded-full w-32 h-32 object-cover" alt="avatar" />
                )}
            </div>
            <div className='flex flex-row justify-center items-center w-full font-black text-lg mb-4'>
                {profileEdit ? (
                    <span>Edit Profile</span>
                ) : (
                    <span>{user.profile.full_name}</span>
                )}
            </div>

            {profileEdit ? (
                <div className='flex flex-col justify-evenly bg-gray-200 rounded-md p-3'>
                    <div>
                        <Form onSubmit={handleProfileSubmit}>
                            <FormField>
                                <label htmlFor="phone_number">Phone:</label>
                                <input
                                    className="h-[2.5rem]"
                                    type="text"
                                    name="phone_number"
                                    value={phone_number}
                                    onChange={handleProfileChange}
                                />
                            </FormField>
                            <FormField className='!-mt-2'>
                                <label htmlFor="website">Website:</label>
                                <input
                                    className="h-[2.5rem]"
                                    type="text"
                                    name="website"
                                    value={website}
                                    onChange={handleProfileChange}

                                />
                            </FormField>
                            <FormField className='!-mt-2'>
                                <label htmlFor="trec">TREC ID:</label>
                                <input
                                    className="h-[2.5rem]"
                                    type="text"
                                    name="trec"
                                    value={trec}
                                    onChange={handleProfileChange}

                                />
                            </FormField>
                            <div className='flex justify-center mt-2'>
                                <Button color="green" type="submit" size='tiny'>
                                    {isLoading ? (
                                        <>
                                            <Loader active inline inverted size='mini' />
                                        </>
                                    ) : (
                                        <span>SAVE PROFILE UPDATES</span>
                                    )}
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <Divider />
                    <div>
                        <Form onSubmit={handleAvatarSubmit} className='flex flex-col items-center justify-center'>
                            <FormField>
                                <label className="label" htmlFor="avatar">Profile Picture:</label>
                                <input
                                    className="rounded-lg"
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </FormField>
                            <div className='flex justify-center'>
                                <Button color="green" type="submit" size='tiny'>
                                    {isLoading ? (
                                        <>
                                            <Loader active inline inverted size='mini' />
                                        </>
                                    ) : (
                                        <span>UPLOAD</span>
                                    )}

                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            ) : (
                <div>
                    <p><b>Phone:</b> {user.profile.phone_number}</p>
                    <p><b>Email:</b> {user.profile.email}</p>
                    <p><b>Website:</b> {user.profile.website}</p>
                    <p><b>TREC ID:</b> {user.profile.trec}</p>
                </div>
            )}

        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    user: state.auth.user,
});

export default connect(mapStateToProps, { update_profile, update_avatar, load_user })(Profile);